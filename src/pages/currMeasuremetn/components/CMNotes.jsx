import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCreateNoteMutation,
  useGetNotesQuery,
} from "pages/currMeasuremetn/api/notesApi";
import { userApi } from "shared/api/userApi";

export const CMNotes = () => {
  const { curr } = useParams();
  const [noteValue, setNoteValue] = useState("");

  const [addNote] = useCreateNoteMutation();
  const { data: userData } = userApi.useGetUserDataQuery();
  const { data: notesData, isLoading: isLoadingNotesData } = useGetNotesQuery(
    userData.id
  );

  const createNote = async (e) => {
    const note = e.target.value;
    setNoteValue(note);

    const payload = {
      id: userData.id,
      type: curr,
      note,
    };

    try {
      await addNote(payload);
    } catch (error) {
      console.log(error, error.message);
    }
  };

  useEffect(() => {
    if (isLoadingNotesData) {
      setNoteValue("loading..");
    } else {
      const currNote = notesData.find((note) => note.type === curr);
      currNote ? setNoteValue(currNote.note) : setNoteValue("");
    }
  }, [curr, isLoadingNotesData, notesData]);
  return (
    <Input.TextArea
      defaultValue={noteValue}
      placeholder="write your notes..."
      value={noteValue}
      onBlur={createNote}
      onChange={(e) => setNoteValue(e.target.value)}
    />
  );
};
