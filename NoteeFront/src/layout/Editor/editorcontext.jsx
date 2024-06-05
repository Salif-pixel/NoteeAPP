import { createContext, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph"
import Header from "@editorjs/header"
import Alert from "editorjs-alert"
import List from "@editorjs/list"
import Embed from "@editorjs/embed"
import Underline from "@editorjs/underline"
import ChangeCase from "editorjs-change-case"
import Strikethrough from "@sotaproject/strikethrough"
import Checklist from "@editorjs/checklist"
import SimpleImage from "@editorjs/simple-image"
import Marker from "@editorjs/marker"
import InlineCode from "@editorjs/inline-code"
import ColorPlugin from "editorjs-text-color-plugin"
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import AlignmentBlockTune from "editorjs-text-alignment-blocktune"
import Warning from '@editorjs/warning';
import Raw from '@editorjs/raw';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';

export const EditorContext = createContext()

function EditorContextProvider(props) {
    const editorInstanceRef = useRef(null)
    const initEditor = () => {
        const editor = new EditorJS({
            holder: "editorjs",
            placeholder: "Allons prendre des notes !",
            tools: {
                textAlignment: {
                    class: AlignmentBlockTune,
                    config: {
                        default: "left",
                        blocks: {
                            header: "center"
                        }
                    }
                },
                paragraph: {
                    class: Paragraph,
                    tunes: ["textAlignment"]
                },

                alert: {
                    class: Alert,
                    config: {
                        defaultType: "primary",
                        messagePlaceholder: "Enter something"
                    }
                },
                list: {
                    class: List,
                    config: {
                        defaultStyle: "unordered"
                    }
                },
                checklist: {
                    class: Checklist,
                },

                embed: {
                    class: Embed,
                    config: {
                        services: {
                            youtube: true,
                            codepen: true,
                            google: true,
                        }
                    }
                },
                underline: {
                    class: Underline,
                },
                strikethrough: {
                    class: Strikethrough,
                },



                table: Table,

                code: Code,

                raw: {
                    class: Raw,
                    config: {
                        backgroundColor: "bg-gray-200", // Fond par défaut
                    }
                },



                marker: Marker,
                delimiter: Delimiter,
                simpleImage: SimpleImage,
                inlineCode: {
                    class: InlineCode,
                    config: {
                        color: "#0000FF", // Couleur de texte en mode code par défaut
                        colors: ["#FF0000", "#00FF00", "#0000FF"], // Liste des couleurs de texte en mode code disponibles
                    },
                },
                Color: {
                    class: ColorPlugin,
                    config: {
                        colorCollections: [
                            '#EC7878',
                            '#9C27B0',
                            '#673AB7',
                            '#3F51B5',
                            '#0070FF',
                            '#03A9F4',
                            '#00BCD4',
                            '#4CAF50',
                            '#8BC34A',
                            '#CDDC39',
                            '#FFF',
                        ],
                        defaultColor: "#0070FF",
                        customPicker: true,
                    }
                }
            },
        })

        editorInstanceRef.current = editor
    }
    return (
        <EditorContext.Provider value={{initEditor, editorInstanceRef}}>
            {props.children}
        </EditorContext.Provider>
    );
}

export default EditorContextProvider;