

export const CreateChatButton = () => {
    const buttonStyles = {
        fontFamily: 'Jura',
        fontSize: "20px",
        
        backgroundColor: "#BFFFB4",
    
        borderRadius: "10px",
        border: "1px solid black",
    
        width: "710px",
    
        marginBottom: "10px",
    
        position: "relative",
        left: "50%",
        transform: "translate(-50%, 0)",
    }

    return (
        <button className="createChatButton" style={buttonStyles}>
            Create chat
        </button>
    );
};