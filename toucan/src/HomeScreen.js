import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right, Card } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

const { width, height } = Dimensions.get('window');
const database = firebase.database();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      user: '',
      email: '',
      events: [],
    });

    let curUser = firebase.auth().currentUser;
    if (curUser !== null) {
      this.state.user = curUser;
      this.state.email = this.state.user.email;
    }

    // using a GET request to pull events from database..
    //    kind of iffy and might be resource intensive
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        // setting this.state.events to the values from the databse
        this.state.events = request.responseText;
      } else {
        console.warn('error');
      }
    };

    request.open('GET', 'https://toucan-v1-6245e.firebaseio.com/events.json');
    request.send();
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Home</Title>
            </Body>
            <Right style={ styles.navButtons }>
              <Icon name="ios-add" onPress={() => this.props.navigation.navigate("AddEvent")} style={styles.rightIcon} />
            </Right>
        </Header>
        <View style={styles.map}>
          <MapView 
            style={{width: width, height: height / 3}}
            initialRegion={{
              latitude: 38.971668,
              longitude: -95.235252,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0424,
            }}
          />
        </View>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* will probably be switching to FlatList from react-native */}
          <Grid style={{paddingLeft: 5.5}}>
            <Col style={{alignItems: 'center'}}>
              <Card style={styles.cards}>
                <Button style={styles.cardBtn} onPress={() => this.props.navigation.navigate('Nest') }>
                  <Text>
                    {this.state.email}
                  </Text>
                </Button>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cards}>
                <Button style={styles.cardBtn} onPress={() => this.props.navigation.navigate('Nest') }>
                  <Text>
                    CARD 2
                  </Text>
                </Button>
              </Card>
            </Col>
          </Grid>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      paddingTop: 10,
      paddingBottom: 35,
      alignItems: 'center',
      backgroundColor: '#e8e8e8',
    },
    header: {
      backgroundColor: '#1E7898',
    },
    leftIcon: {
        color: 'white',
        left: 10,
    },
    rightIcon: {
      color: 'white',
      right: 10,
    },
    navTitle: {
      color: 'white',
      fontSize: 19,
      fontFamily: 'Ubuntu-B',
    },
    navButtons: {
      flex: 1,
    },
    cards: {
      width: width / 2.2,
      aspectRatio: 3/4,
      backgroundColor: 'transparent',
    },
    cardBtn: {
      flex: 1, 
      width: width / 2.2,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    map: {
      borderBottomWidth: 2,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    }
  });