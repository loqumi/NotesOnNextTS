import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Note {
    id: number;
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
    const response = await axios.get('http://localhost:5000/notes');
    return response.data;
});

// Удаление заметки
export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId: number) => {
    await axios.delete(`http://localhost:5000/notes/${noteId}`);
    return noteId;
});

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
        },
        editNote: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
    },
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
            });
    },
});

export const { addNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;
