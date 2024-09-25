import Link from 'next/link';
import { Button } from 'react-bootstrap';
import NotesList from '../components/NotesList';

export default function Home() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>All Notes</h2>
                <Link href="/note/new" passHref>
                    <Button variant="primary">Add Note</Button>
                </Link>
            </div>
            <NotesList />
        </div>
    );
}
