import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";
import Alert from "editorjs-alert";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";
import Strikethrough from "@sotaproject/strikethrough";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import ColorPlugin from "editorjs-text-color-plugin";
import Code from "@editorjs/code";

import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";


export const EDITOR_JS_TOOLS  = {
    textAlignment: {
        class: AlignmentBlockTune,
        config: {
            default: "left",
            blocks: {
                header: "center"
            }
        }
    },
    paragraph: { class: Paragraph, tunes: ["textAlignment"] },
    alert: {
        class: Alert,
        config: {
            defaultType: "primary",
            messagePlaceholder: "Enter something"
        }
    },
    list: { class: List },
    checklist: { class: Checklist },
    image: {
        class: SimpleImage,
        inlineToolbar: true,
        config: {
            placeholder: 'Paste image URL'
        }
    },
    header: { class: Header, config: { placeholder: "Enter a header", } },
    embed: { class: Embed },
    underline: { class: Underline },
    strikethrough: { class: Strikethrough },
    marker: { class: Marker },
    inlineCode: { class: InlineCode },
    color: { class: ColorPlugin },
    code: { class: Code },
    delimiter: { class: Delimiter },
    table: { class: Table },
    raw: { class: Raw },

};
