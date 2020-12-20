import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Input,
} from '@chakra-ui/react';

import { Formik, Form, Field } from 'formik';

const AddBookMarkModal = ({ isOpen, onClose, onAdd, isLoading }) => {
  function validateTitle(value) {
    let error;
    if (!value) {
      error = 'Title value is required';
    }
    return error;
  }
  function validateDescription(value) {
    let error;
    if (!value) {
      error = 'Description value is required';
    }
    return error;
  }
  function validateType(value) {
    let error;
    if (!value) {
      error = 'Type value is required';
    }
    return error;
  }
  function validateUrl(value) {
    let error;
    const regex = new RegExp(
      '^(?:(?:http(?:s)?|ftp)://)(?:\\S+(?::(?:\\S)*)?@)?(?:(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)(?:\\.(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)*(?:\\.(?:[a-z0-9\u00a1-\uffff]){2,})(?::(?:\\d){2,5})?(?:/(?:\\S)*)?$'
    );
    if (!value) {
      error = 'Url value is required';
    } else if (!regex.test(value)) error = 'Enter valid Url';
    return error;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new Bookmark</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              title: '',
              description: '',
              url: '',
              type: '',
            }}
            onSubmit={(values, actions) => {
              onAdd({ payload: values });
              // actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <Field name="title" validate={validateTitle}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Input {...field} id="title" placeholder="title" />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description" validate={validateDescription}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
                      <FormLabel htmlFor="description" mt="8px">
                        Description
                      </FormLabel>
                      <Input
                        {...field}
                        id="description"
                        placeholder="description"
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="url" validate={validateUrl}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.url && form.touched.url}
                    >
                      <FormLabel htmlFor="url" mt="8px">
                        Url
                      </FormLabel>
                      <Input {...field} id="url" placeholder="url" />
                      <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="type" validate={validateType}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.type && form.touched.type}
                    >
                      <FormLabel htmlFor="type" mt="8px">
                        Type
                      </FormLabel>
                      <Select placeholder="Select type" {...field}>
                        <option>reading</option>
                        <option>portfolio</option>
                        <option>Personal site</option>
                      </Select>
                      <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isLoading}
                  type="submit"
                >
                  Submit
                </Button>
                <Button colorScheme="blue" mt={4} ml="8px" onClick={onClose}>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookMarkModal;
