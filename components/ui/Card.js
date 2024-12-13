import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";

function Card({children}) {
    return (
        <View style={styles.cardContainer}>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
        padding: 16,
        marginTop: 100,
        marginHorizontal: 24,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        showRadius: 6,
        shadowOpacity: .25,
        alignItems: "center",
        justifyContent: 'center',
    },
});