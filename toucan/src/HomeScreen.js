import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
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
          <Grid style={{paddingLeft: 5.5}}>
            <Col style={{alignItems: 'center'}}>
              <Card style={styles.cards}>
                <CardItem>
                  <Body>
                    <Text>{this.state.email}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.cards}>
                <CardItem>
                  <Body>
                    <Text>CARD 3</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.cards}>
                <CardItem>
                  <Body>
                    <Text>CARD 5</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.cards}>
                <CardItem>
                  <Body>
                    <Text>CARD 7</Text>
                  </Body>
                </CardItem>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cards}>
                  <CardItem>
                    <Body>
                      <Text>CARD 2</Text>
                    </Body>
                  </CardItem>
                </Card>
                <Card style={styles.cards}>
                  <CardItem>
                    <Body>
                      <Text>CARD 4</Text>
                    </Body>
                  </CardItem>
                </Card>
                <Card style={styles.cards}>
                  <CardItem>
                    <Body>
                      <Text>CARD 6</Text>
                    </Body>
                  </CardItem>
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
    },
    map: {
      borderBottomWidth: 2,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    }
  });