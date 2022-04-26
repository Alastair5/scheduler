import "components/Appointment/styles.scss";
import React from 'react'
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Status from "components/Appointment/Status.js";
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const DELETING = 'DELETING';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log(interview);
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(() => {
      transition(ERROR_SAVE, true);
    });
  };

  function cancel(id) {
    transition(DELETING, true);
    props.cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() => {
      transition(ERROR_DELETE, true);
    });
  };

  function confirm() {
    transition(CONFIRM)
  };

  function cancelConfirm() {
    transition(SHOW);
  };

  function edit() {
    transition(EDIT);
  }
  

return <article className="appointment">
  <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
          id={props.id}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          id={props.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          id={props.id}
          onConfirm={cancel}
          onCancel={cancelConfirm}
        />
        )}
      {mode === CREATE && (
        <Form
          id={props.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && (
        <Error
        message={"deleting item"}
        onClose={back}
        />
        )}
      {mode === ERROR_SAVE && (
        <Error
          message={"saving item"}
          onClose={back}
        />
        )}
    </article>;

};