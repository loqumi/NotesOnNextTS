'use client';

import React, { useEffect, useState } from 'react';
import { fetchNoteById } from '../store/notesSlice';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "../store/store";
import {createNote, Note, updateNote} from '../store/notesSlice';

interface NoteFormProps {
    existingNote?: Note;
}

const NoteForm = ({ existingNote }: NoteFormProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { id } = useParams();
    const noteFromState = useAppSelector(state => state.notes.notes.find(note => note.id === Number(id)));

    const [title, setTitle] = useState(existingNote ? existingNote.title : '');
    const [content, setContent] = useState(existingNote ? existingNote.content : '');
    const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

    useEffect(() => {
        if (id && !existingNote) {
            dispatch(fetchNoteById(Number(id)));
        }
    }, [id, dispatch, existingNote]);

    useEffect(() => {
        if (noteFromState) {
            setTitle(noteFromState.title);
            setContent(noteFromState.content);
        }
    }, [noteFromState]);

    const validate = () => {
        const newErrors: { title?: string; content?: string } = {};
        if (!title) newErrors.title = 'Title is required';
        if (!content) newErrors.content = 'Content is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const noteToUpdate = existingNote || noteFromState;

        if (noteToUpdate) {
            const updatedNote = { ...noteToUpdate, title, content };
            await dispatch(updateNote(updatedNote));
        } else {
            const newNote: Note = { id: Date.now().toString(), title, content };
            await dispatch(createNote(newNote));
        }

        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="form-group">
                <label>Content</label>
                <textarea
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {errors.content && <div className="invalid-feedback">{errors.content}</div>}
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                {existingNote || noteFromState ? 'Update Note' : 'Add Note'}
            </button>
        </form>
    );
};

export default NoteForm;
