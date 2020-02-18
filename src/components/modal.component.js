import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal, Grid } from 'semantic-ui-react';
import '../styles/modal.scss';

class ModalControlled extends Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        const {title, cover, desc, author, category, status, validTill, owner} = this.props.data;
        return (
            <div className='modal'>
                <Modal trigger={<Icon link circular  color='red' size='mini' name='info' onClick={this.handleOpen}></Icon>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    size='small'>
                    <Icon name="close" onClick={this.handleClose}/>
                    <Modal.Header></Modal.Header>
                    <Modal.Content image scrolling>
                        <Image size="large" wrapped src={cover}/>
                        <Modal.Description>
                            <Header>{title}</Header>
                            <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <p>Description</p>
                                </Grid.Column>
                                <Grid.Column>
                                    {desc}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <p>Category</p>
                                </Grid.Column>
                                <Grid.Column>
                                    {category}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <p>Author</p>
                                </Grid.Column>
                                <Grid.Column>
                                    {author}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <p>Status</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <p>{status}</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <p>Owner</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <p>{owner.name}</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <p>Availability</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <p>{status==='BORROWED' ? new Date(validTill).toLocaleDateString() : "Available"}</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleClose} inverted>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
export default ModalControlled;