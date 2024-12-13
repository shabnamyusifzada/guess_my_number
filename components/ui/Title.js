import {StyleSheet, Text} from "react-native";

function Title({children}) {
    return <Text style={styles.title}>{ children }</Text>;
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 20,
    },
})