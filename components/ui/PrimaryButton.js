import {Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";

function primaryButton({children, onPress}) {
    function pressHandler() {
        onPress();
    }

    return (
        <View style={styles.outerContainer}>
            <Pressable
                onPress={onPress}
                android_ripple={{color: Colors.primary600}}
                style={({pressed}) =>
                    pressed
                        ? [styles.pressed, styles.innerContainer]
                        : styles.innerContainer
                }
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default primaryButton;

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    innerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        textAlign: "center",
    },
    pressed: {
        opacity: .75,
    }
})