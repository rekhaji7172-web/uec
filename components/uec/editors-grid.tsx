import { EDITOR_LIST, type Editor } from "@/lib/uec-data"
import { Avatar } from "./avatar"
import { CrownIcon } from "./icons"

interface EditorsGridProps {
  onOpenEditor: (editor: Editor) => void
}

export function EditorsGrid({ onOpenEditor }: EditorsGridProps) {
  return (
    <div className="editors-grid">
      {EDITOR_LIST.map((editor) => {
        const isChamp = editor.wins > 0
        return (
          <button
            key={editor.name}
            type="button"
            className={`editor-card${isChamp ? " is-champ" : ""}`}
            onClick={() => onOpenEditor(editor)}
            aria-label={`View profile for ${editor.name}`}
          >
            <Avatar name={editor.name} size={52} />
            <div className="editor-card-body">
              <div className="editor-card-name">{editor.name}</div>
              <div className="editor-card-meta">
                Best #{editor.bestRank} · {editor.history.length} season
                {editor.history.length === 1 ? "" : "s"}
              </div>
              {isChamp && (
                <span className="editor-card-badge">
                  <CrownIcon size={13} />
                  {editor.wins}× Champion
                </span>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
