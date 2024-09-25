'use client'

import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState } from '../../../../store/store';
import NoteForm from '../../../../components/NoteForm';

export default function EditNote() {
    const { id } = useParams();
    const existingNote = useSelector((state: RootState) =>
        state.notes.notes.find((note) => Number(note.id) === Number(id))
    );

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
