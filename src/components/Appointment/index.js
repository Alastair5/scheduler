import "components/Appointment/styles.scss";
import React from 'react'
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Status from "components/Appointment/Status.js";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log(interview);
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    });
  }

  function cancel(id) {
    transition(SAVING);
    props.cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
  }
  

return <article className="appointment">
  <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
          id={props.id}
        />
      )}
      {mode === SAVING && <Status />}
      {mode === CREATE && (
        <Form
          id={props.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
</article>;

};