import css from "./NoteForm.module.css";
import { useId } from "react";
import { Formik, Form, Field } from "formik";
import { Note } from "../../types/note";

interface FormValues {
  title: string;
  content: string;
}

const initialFormValues: FormValues = {
  title: "",
  content: "",
};

export default function NoteForm() {
  const fieldId = useId();

  const handleSubmit = (values: FormValues, formikHelpers) => {
    console.log(values);
  };

  return (
    <Formik initialValues={{ initialFormValues }} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <span name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <span name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
          <span name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            // disabled=false
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
