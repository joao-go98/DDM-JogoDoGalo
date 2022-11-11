import React, { useState, useEffect } from 'react'
import { ScrollView,StyleSheet, Button, Text, View, SafeAreaView, Pressable, Image, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import history from './components/history';
import plays from './components/plays';

const windowWidth = Dimensions.get('window').width;

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Jogo Do Galo"
        onPress={() => navigation.navigate('Jogo Do Galo')}
      />
      <Text></Text>
      <Button
        title="Historico"
        onPress={() => navigation.navigate('Historico')}
      />
    </View>
  );
}

function GaloScreen() {
  const [active_player, setActive_player] = useState('X')
  const [markers, setMarkers] = useState([
    null, null, null,
    null, null, null,
    null, null, null
  ])
  
  //FUNÇÃO PARA RECEBER POSIÇÃO DO USER/ADVERSARIO
  const markPosition = (position) => {
    if(!markers[position]){
      let temp = [...markers]
      temp[position] = active_player
      setMarkers(temp)
      plays.nr = plays.nr + 1
      //muda de jogador
      if(active_player === 'X'){
        setActive_player('O')
      }else{
        setActive_player('X')
      }
    }
  }
  
  // LIMPAR O ECRA
  const resetMarkers = () => {
    setMarkers([
      null, null, null,
      null, null, null,
      null, null, null
    ])
    plays.nr = 1
  }

  //VER QUEM É QUE VENCEU
  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){return squares[a];}
    }
    return null;
  }

  useEffect(() => {
    const winner = calculateWinner(markers);
    if(winner === 'X'){
      alert("O jogador X ganhou!")
      history.key = history.key + 1
      history.historico.unshift(<VenceX key={history.key}></VenceX>)
      resetMarkers()
    }else if(winner === 'O'){
      alert("O jogador O ganhou!")
      history.key = history.key + 1
      history.historico.unshift(<VenceO key={history.key}></VenceO>)
      resetMarkers()
    }
    else
    {
      if(plays.nr === 10){
        alert("Os jogadores empataram")
        history.key = history.key + 1
        history.historico.unshift(<Empate key={history.key}></Empate>)
        resetMarkers()
      }
    }
  }, [markers])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.body}>
        <View style={[styles.playerInfo, { backgroundColor: active_player === 'X' ? '#007FF4' : '#F40075' }]}>
          <Text style={styles.playerTxt}>É a vez do {active_player} jogar</Text>
        </View>
        <View style={styles.mainContainer}>

          {/* Top Left Cell */}
          <Pressable style={styles.cell_top_left} onPress={()=>markPosition(0)}>
            {markers[0] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[0] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>

          {/* Top Mid Cell */}
          <Pressable style={styles.cell_top_mid} onPress={()=>markPosition(1)}>
            {markers[1] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[1] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>

          {/* Top Right Cell */}
          <Pressable style={styles.cell_top_right} onPress={()=>markPosition(2)}>
            {markers[2] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[2] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>

          {/* Mid Left Cell */}
          <Pressable style={styles.cell_mid_left} onPress={()=>markPosition(3)}>
            {markers[3] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[3] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>

          {/* Mid Mid Cell */}
          <Pressable style={styles.cell_mid_mid} onPress={()=>markPosition(4)}>
            {markers[4] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[4] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>

          {/* Mid Right Cell */}
          <Pressable style={styles.cell_mid_right} onPress={()=>markPosition(5)}>
            {markers[5] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[5] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>

          {/* Bottom Left Cell */}
          <Pressable style={styles.cell_bottom_left} onPress={()=>markPosition(6)}>
            {markers[6] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[6] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>

          {/* Bottom Mid Cell */}
          <Pressable style={styles.cell_bottom_mid} onPress={()=>markPosition(7)}>
            {markers[7] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[7] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>

          {/* Bottom Right Cell */}
          <Pressable style={styles.cell_bottom_right} onPress={()=>markPosition(8)}>
            {markers[8] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon} />}
            {markers[8] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon} />}
          </Pressable>
        </View>


        <Pressable style={styles.cancleBTN} onPress={resetMarkers}>
          <Image source={require('./assets/img/replay.png')} style={styles.cancelIcon}/>
        </Pressable>

        </SafeAreaView>
    </View>
  );
}

function HistoricoScreen() {
  return (
    <ScrollView>
      {history.historico}
    </ScrollView>
  );
}

const VenceX = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.x}>
        <Text style = {styles.texto}>Vencedor X</Text>
      </View>
    </View>
  )
}

const VenceO = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.o}>
        <Text style = {styles.texto}>Vencedor O</Text>
      </View>
    </View>
  )
}

const Empate = () => {
  return (
  <View style={styles.container}>
    <View style = {styles.empatados}>
      <Text style = {styles.texto}>Empate</Text>
    </View>
  </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Jogo Do Galo" component={GaloScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff'
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  playerTxt: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#fff'
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 30
  },
  cell_top_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
    borderBottomWidth: 6
  },
  cell_top_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6
  },
  cell_top_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },
  cell_mid_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
  },
  cell_mid_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_mid_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 6,
  },
  cell_bottom_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
    borderTopWidth: 6,
  },
  cell_bottom_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 6,
  },
  cell_bottom_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 6,
    borderTopWidth: 6,
  },
  icon: {
    height: 62,
    width: 62
  },
  cancleBTN: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  cancelIcon: {
    height: 80,
    width: 80
  },
  
  container:{
    height:150,
    width:350,
    borderColor:'red',
    alignSelf:'center',
    marginVertical:15,
    justifyContent:'center',
},
x:{
    height:150,
    width:200,
    backgroundColor:'#007FF4',
    position:'absolute',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
},
o:{
  height:150,
  width:200,
  backgroundColor:'#F40075',
  position:'absolute',
  borderRadius:30,
  justifyContent:'center',
  alignItems:'center'
},
empatados:{
  height:150,
  width:200,
  backgroundColor:'green',
  position:'absolute',
  borderRadius:30,
  justifyContent:'center',
  alignItems:'center'
},
texto:{
    fontSize:30,
    fontWeight:'bold',
    color:'white'
}
})
