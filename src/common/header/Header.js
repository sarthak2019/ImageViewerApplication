import React from 'react';

const Header = function () {
    const headerStyle = {
        textAlign: 'left',
        padding: 20,
        background: '#263238',
        color: '#fff',
        fontSize: '18px',
        verticalAlign: 'middle'
    };

    return (
        <div style={headerStyle}>
            Image Viewer
        </div>
    )
}

export default Header;