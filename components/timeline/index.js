import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_TIMELINE_ENTRIES } from '../../graphql/queries';
import { mapDataByMonth } from '../../utils/index';
import Year2020 from './components/RenderYear';
import TimeLineEntry from './components/Timeline';
import { useToast } from '@chakra-ui/react';

const Timeline = () => {
  const { data } = useQuery(GET_ALL_TIMELINE_ENTRIES);

  const timelineData = mapDataByMonth(data.timeline);

  const toast = useToast();

  return (
    <>
      {timelineData &&
        timelineData.map((entry) => {
          const [month, { monthData, year }] = entry;
          return (
            <React.Fragment key={month}>
              <Year2020 month={month} year={year} />

              {monthData &&
                monthData.map(
                  ({ id, type, title, date, post, ...rest }, index) => {
                    const props = {
                      id,
                      monthData,
                      index,
                      type,
                      title,
                      date,
                      post,
                      rest,
                      toast: (props) => toast(props)
                    };
                    return <TimeLineEntry {...props} key={id} />;
                  }
                )}
            </React.Fragment>
          );
        })}
    </>
  );
};

export default Timeline;
