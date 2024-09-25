'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { RootState, useAppDispatch } from '../store/store';
import { deleteNote, fetchNotes, Note } from '../store/notesSlice';

const NotesList = () => {
    const dispatch = useAppDispatch();
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showModal, setShowModal] = useState(false);
    const { notes, loading, error } = useSelector((state: RootState) => state.notes);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    const handleDeleteNote = (note: Note) => {
        setSelectedNote(note);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (selectedNote) {
            await dispatch(deleteNote(Number(selectedNote.id)));
            dispatch(fetchNotes());
        }
        setShowModal(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (notes.length === 0) return <p>Notes not found!</p>

    return (
        <div>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    placeholder="Search notes..."
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="form-select ms-2"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                >
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                </select>
            </div>

            <ul className="list-group">
                {sortedNotes.map(note => (
                    <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link href={`/note/${note.id}`}>
                            {note.title}
                        </Link>
                        <div>
                            <Link href={`/note/edit/${note.id}`}>
                                <Button variant="warning" size="sm" className="me-2">Edit</Button>
                            </Link>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteNote(note)}
                            >
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the note "{selectedNote?.title}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NotesList;
