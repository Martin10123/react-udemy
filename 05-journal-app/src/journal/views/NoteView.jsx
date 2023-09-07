import { useEffect, useMemo, useRef } from "react";
import Swal from "sweetalert2";

import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUpdaloadingFiles,
} from "../../store/journal";

import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const dispatch = useDispatch();

  const { body, title, onInputChange, formState, date } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString();

    return newDate;
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputchange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUpdaloadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputchange}
          style={{ display: "none" }}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          color="primary"
          disabled={isSaving}
          onClick={onSaveNote}
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          fullWidth
          label="Titulo"
          name="title"
          onChange={onInputChange}
          placeholder="Ingrese un titulo"
          sx={{ border: "none", mb: 1 }}
          type="text"
          value={title}
          variant="filled"
        />

        <TextField
          fullWidth
          minRows={5}
          multiline
          name="body"
          onChange={onInputChange}
          placeholder="Que sucedió en el dia de hoy?"
          sx={{ border: "none", mb: 1 }}
          type="text"
          value={body}
          variant="filled"
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
