import { createContext, useContext, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
    return useContext(ModalContext);
};

const customStyles = {
    overlay: {
        position: "fixed",
        zIndex: 9999,
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const opts = {
    height: "390",
    width: "640",
    playerVars: {
        autoplay: 1,
    },
};

const ModalProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [videoId, setVideoId] = useState("");
    const handlePlayTrailer = (trailerUrl) => {
        // const trailerKey = (trailerUrl || "").split("v=")[1];
        const trailerKey = trailerUrl;
        setModalIsOpen(true);
        setVideoId(trailerKey);
    };

    return (
        <ModalContext.Provider value={{ handlePlayTrailer }}>
            {children}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Trailer Modal"
            >
                <YouTube videoId={videoId} opts={opts} />
            </Modal>
        </ModalContext.Provider>
    );
};

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ModalProvider;
