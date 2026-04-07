import React from 'react';
import RangeInfo from './rangeInfo';


export default function NotesPanel({
  notes,
  onUpdate,
  onToggleImportant,
  onToggleDone,
  onAdd,
  onDelete,
  startKey,
  endKey,
  onClearRange,
}) {
  return (
    <aside className="notes-panel" aria-label="Monthly notes">
      <p className="notes-panel__heading">Notes</p>

      <ul className="notes-panel__list" role="list">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onUpdate={onUpdate}
            onToggleImportant={onToggleImportant}
            onToggleDone={onToggleDone}
            onDelete={onDelete}
          />
        ))}
      </ul>

      <button className="notes-panel__add-btn" onClick={onAdd} aria-label="Add note">
        + Add note
      </button>

      {/* Range summary */}
      <RangeInfo startKey={startKey} endKey={endKey} onClear={onClearRange} />
    </aside>
  );
}

// ── NoteItem 

function NoteItem({ note, onUpdate, onToggleImportant, onToggleDone, onDelete }) {
  const itemClasses = [
    'note-item',
    note.important && 'is-important',
    note.done      && 'is-done',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={itemClasses} role="listitem">
      {/* Coloured status dot */}
      <span className="note-item__dot" aria-hidden="true" />

      {/* Editable text */}
      <input
        className="note-item__input"
        type="text"
        placeholder="Add note..."
        value={note.text}
        onChange={(e) => onUpdate(note.id, e.target.value)}
        aria-label="Note text"
      />

      {/* Action buttons */}
      <div className="note-item__actions" role="group" aria-label="Note actions">
        <button
          className={`note-item__action-btn${note.important ? ' is-important' : ''}`}
          onClick={() => onToggleImportant(note.id)}
          title={note.important ? 'Remove important' : 'Mark important'}
          aria-label={note.important ? 'Remove important' : 'Mark important'}
        >
          ★
        </button>

        <button
          className={`note-item__action-btn${note.done ? ' is-done' : ''}`}
          onClick={() => onToggleDone(note.id)}
          title={note.done ? 'Mark undone' : 'Mark done'}
          aria-label={note.done ? 'Mark undone' : 'Mark done'}
        >
          ✓
        </button>

        <button
          className="note-item__action-btn del"
          onClick={() => onDelete(note.id)}
          title="Delete note"
          aria-label="Delete note"
        >
          ✕
        </button>
      </div>
    </li>
  );
}