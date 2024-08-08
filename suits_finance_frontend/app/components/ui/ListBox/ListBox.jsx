import React from "react";
import { Listbox, ListboxItem, cn } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { AddNoteIcon } from "./AddNoteIcon.jsx";
import { CopyDocumentIcon } from "./CopyDocumentIcon.jsx";
import { EditDocumentIcon } from "./EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "./DeleteDocumentIcon.jsx";

export default function App() {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <ListboxWrapper>
            <Listbox variant="faded" aria-label="Listbox menu with icons">
                <ListboxItem
                    key="new"
                    startContent={<AddNoteIcon className={iconClasses} />}
                >
                    New file
                </ListboxItem>
                <ListboxItem
                    key="copy"
                    startContent={<CopyDocumentIcon className={iconClasses} />}
                >
                    Copy link
                </ListboxItem>
                <ListboxItem
                    key="edit"
                    showDivider
                    startContent={<EditDocumentIcon className={iconClasses} />}
                >
                    Edit file
                </ListboxItem>
                <ListboxItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                >
                    Delete file
                </ListboxItem>
            </Listbox>
        </ListboxWrapper>
    );
}
