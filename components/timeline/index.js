import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Flex, Text } from '@chakra-ui/react';

import { GET_ALL_TIMELINE_ENTRIES } from '../../graphql/queries';
import { isLastElement, mapDataByMonth, isPost } from '../../utils/index';
import Year2020 from './components/RenderYear';
import Splitter from './components/Splitter';
import Header from './components/Header';
import PostTimeLine from './components/PostTimeline';

const Timeline = () => {
  const { data } = useQuery(GET_ALL_TIMELINE_ENTRIES);

  const timelineData = mapDataByMonth(data.timeline);

  const renderBody = (type, post, { description, imageUrl }) => {
    if (isPost(type)) {
      const { postUrl, title, description } = post;
      const props = { postUrl, title, description };
      return <PostTimeLine {...props} />;
    }
    console.log(imageUrl);
    return (
      <Flex flexDirection="column" mt="8px">
        {description && (
          <Text fontWeight={500} mt="4px" fontSize="md">
            {description}
          </Text>
        )}
        {imageUrl && (
          <Box rounded="lg" maxWidth="100%" maxHeight="100%">
            <img src={imageUrl} />
          </Box>
        )}
      </Flex>
    );
  };

  return (
    timelineData &&
    timelineData.map((entry) => {
      const [month, { monthData, year }] = entry;
      return (
        <React.Fragment key={month}>
          <Year2020 month={month} year={year} />
          {monthData &&
            monthData.map(({ id, type, title, date, post, ...rest }, index) => (
              <Flex key={id} pb="36px">
                <Splitter
                  isLastElement={isLastElement(monthData, index)}
                  type={type}
                />
                <Flex flexDirection="column" marginLeft="24px">
                  <Header title={title} date={date} />
                  {renderBody(type, post, rest)}
                </Flex>
              </Flex>
            ))}
        </React.Fragment>
      );
    })
  );
};

export default Timeline;
