import {Alert, StyleSheet, View, Text, FlatList} from "react-native";
import {useState, useEffect} from "react";
import {Ionicons} from '@expo/vector-icons';

import Card from "../components/ui/Card";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    }

    return randomNumber;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {
    const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const guessRoundsListLength = guessRounds.length;

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuess(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert(
                "Don't lie!",
                "You know that this is wrong...",
                [
                    {text: "Sorry!", style: 'cancel'},
                ]
            );
            return;
        }
        if (direction === 'greater') {
            minBoundary = currentGuess + 1;
        } else {
            maxBoundary = currentGuess;
        }
        const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);

        setCurrentGuess(newRandomNumber);
        setGuessRounds(previousGuessRounds => [newRandomNumber, ...previousGuessRounds])
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuess.bind(this, 'lower')}>
                            <Ionicons name="remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuess.bind(this, 'greater')}>
                            <Ionicons name="add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    keyExtractor={(item) => item}
                    renderItem={(itemData) => {
                        return <GuessLogItem
                            guess={itemData.item}
                            roundNumber={guessRoundsListLength - itemData.index}
                        />
                    }}
                />
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
})