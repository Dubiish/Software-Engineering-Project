import React from 'react';
import Button from 'react-bootstrap/Button';

class Home extends React.Component {
    render() {
        return(
            <div>
                <h1> Hello world! </h1>
                <Button onClick={this.testFunction}> I am button! </Button>
            </div>
        );
    }
}

export default Home;