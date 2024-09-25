'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams, useRouter } from 'next/navigation';
import { RootState, useAppDispatch } from '../../../store/store';
import { deleteNote, fetchNoteById } from '../../../store/notesSlice';

export default function NoteDetail() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    const state = useSelector((state: RootState) => state.notes);
    const note = state.notes.find((n) => Number(n.id) === Number(id));
    const { loading, error } = state;

    useEffect(() => {
        if (!note) {
            dispatch(fetchNoteById(Number(id)));
        }
    }, [dispatch, id, note]);

    const handleDeleteNote = () => {
        setShowModal(true);
    };

    const confirmDelete = async (noteId: number) => {
        await dispatch(deleteNote(noteId));
        setShowModal(false);
        router.back();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!note) return <p>Note not found!</p>;

    return (
        <div className="form">
            <h2>{note?.title}</h2>
            <p>{note?.content}</p>
            <div>
                <Link href={`/note/edit/${note.id}`}>
                    <Button variant="warning" size="sm" className="me-2">Edit</Button>
                </Link>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteNote()}
                >
                    Delete
                </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the note "{note?.title}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(Number(note.id))}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
