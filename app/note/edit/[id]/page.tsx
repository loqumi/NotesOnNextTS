'use client'

import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import NoteForm from '../../../../components/NoteForm';
import { fetchNoteById } from "../../../../store/notesSlice";
import { RootState, useAppDispatch } from '../../../../store/store';

export default function EditNote() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const existingNote = useSelector((state: RootState) =>
        state.notes.notes.find((note) => Number(note.id) === Number(id))
    );

    useEffect(() => {
        if (!existingNote) {
            dispatch(fetchNoteById(Number(id)));
        }
    }, [dispatch, id, existingNote]);

    return (
        <div>
            <h2>Edit Note</h2>
            {existingNote ? (
                <NoteForm existingNote={existingNote} />
            ) : (
                <p>Note not found!</p>
            )}
        </div>
    );
}
