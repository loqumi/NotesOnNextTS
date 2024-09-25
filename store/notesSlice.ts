import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Note {
    id: number | string;
    title: string;
    content: string;
}

interface NotesState {
    notes: Note[];
    loading: boolean;
    error: string | null;
}

const initialState: NotesState = {
    notes: [],
    loading: false,
    error: null,
};

// Получение всех заметок
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
    return response.data;
});

// Получение заметки по ID
export const fetchNoteById = createAsyncThunk('notes/fetchNoteById', async (noteId: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`);
    return response.data;
});

// Добавление новой заметки
export const createNote = createAsyncThunk('notes/createNote', async (note: Note) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, note);
    return response.data;
});

// Редактирование существующей заметки
export const updateNote = createAsyncThunk('notes/updateNote', async (note: Note) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notes/${note.id}`, note);
    return response.data;
});

// Удаление заметки
export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId: number) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`);
    return noteId;
});

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
                state.loading = false;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch notes';
                state.loading = false;
            })
            .addCase(deleteNote.fulfilled, (state, action: PayloadAction<number>) => {
                state.notes = state.notes.filter(note => note.id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete note';
            })
            .addCase(fetchNoteById.pending, (state) => {
                state.loading = true;
             })
            .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.notes.push(action.payload);
            })
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                const index = state.notes.findIndex(note => note.id === action.payload.id);
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })
            .addCase(fetchNoteById.fulfilled, (state, action) => {
                const existingNoteIndex = state.notes.findIndex(note => note.id === action.payload.id);
                if (existingNoteIndex === -1) {
                    state.notes.push(action.payload);
                }
                state.loading = false;
            })
            .addCase(fetchNoteById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch the note';
                state.loading = false;
            }
        );
    },
});

export default notesSlice.reducer;
