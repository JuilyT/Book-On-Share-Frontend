import React from 'react';
import '../../styles/home.scss';
import ContainerText from '../../components/containerText.component';

class Home extends React.Component {
    
    render() {
        return (
            <div className='home-container'>
                <ContainerText header='Where can I donate books ?' text='PutForShare'/>
            </div>
        );
    }
}
export default Home;