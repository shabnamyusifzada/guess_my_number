import {ImageBackground, SafeAreaView, StyleSheet} from "react-native";
import {useCallback, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    const [isFontLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });

    let screen = <StartGameScreen onConfirmNumber={pickedNumber}/>

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOver}/>
    }

    if(gameIsOver && userNumber) {
        screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGame}/>
    }

    const onLayoutView = useCallback(async () => {
        if(isFontLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [isFontLoaded])

    function gameOver(numberOfRounds) {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    }

    function pickedNumber(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function startNewGame() {
        setUserNumber(null);
        setGuessRounds(0);
    }

    return (
        <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.rootScreen}
            onLayout={onLayoutView}
        >
            <ImageBackground
                source={require('./assets/images/background.png')}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen}>
                    {screen}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    }
})


