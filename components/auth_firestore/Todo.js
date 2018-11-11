import React, { Component } from 'react'
import { View, Text, TextInput, FlatList } from 'react-native'

import firebase from 'react-native-firebase';
import Button from 'react-native-button'

export default class Todo extends Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('todos')
        this.state = {
            todoTasks: [],
            typedNewTodo: '',
            loading: false
        };
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({
                    docId: doc.id,  // GET DOCUMENT ID
                    taskName: doc.data().taskName,
                    createdAt: doc.data().createdAt
                });
            });
            this.setState({
                todoTasks: todos.sort(this.compare),
                loading: false
            });
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    onAdd = () => {
        if(this.state.typedNewTodo.trim() === '') { // IF THE INPUT IS EMPTY, NOT ADD TO FIRESTORE
            alert('todo is blank');
            return;
        }
        this.ref.add({
            taskName: this.state.typedNewTodo,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then((data) => {
            console.log(`added data = ${data}`);
            this.setState({
                typedNewTodo: '',
                loading: true
            });
        }).catch((error) => {
            console.log(`error adding Firestore document = ${error}`);
            this.setState({
                typedNewTodo: '',
                loading: true
            });
        });
    }
    compare = (a,b) => { // SORT THE ARRAY BY ITS CREATEDAT PROPERTY
        if (a.createdAt > b.createdAt)
            return -1;
        if (a.createdAt < b.createdAt)
            return 1;
        return 0;
    }

    render() {
        return (
            <View>
                <TextInput keyboardType='default' placeholder='Enter your todo item'
                    onChangeText={(text) => {this.setState({ typedNewTodo: text });}}/>
                <Button 
                    containerStyle={{ padding: 10, borderRadius: 4, margin: 10, backgroundColor: 'green' }}
                    style={{ fontSize: 17, color: 'white' }}
                    onPress={this.onAdd}
                    >Add</Button>
                <FlatList                    
                    data={this.state.todoTasks}
                    renderItem={({ item, index }) => {
                        return (
                            <Text style={{ fontSize: 16, margin: 20 }}>{item.taskName + " (" + item.docId + "): " + item.createdAt}</Text>
                            );
                    }}     
                    keyExtractor={(item, index) => item.taskName}>
                </FlatList>
            </View>
        )
    }
}
