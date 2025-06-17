// src/components/InstructionModal.jsx
import React from "react";
import "./InstructionModal.css";

function InstructionModal({ visible, onClose, instructions, setInstructions, onSave }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit GPT Prompt Instructions</h2>
        <textarea
          rows={10}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Add any custom instructions to influence how resumes are formatted..."
        />
        <div className="modal-actions">
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default InstructionModal;
