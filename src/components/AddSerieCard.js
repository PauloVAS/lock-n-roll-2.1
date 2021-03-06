import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";


const AddSerieCard = ({isFirstColumn, onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={[
			styles.container,
			isFirstColumn ? styles.firstColumn : styles.lastColumn
		]}>
		<View style={styles.card}>
			{/* <Text>ADD</Text> */}
			<Image
				source={require('../../resources/foco.png')}
				style={styles.image}
			/>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		// Solução 2
		// flex: .5,

		// Solução 1
		width: '50%',
		padding: 5,
		height: Dimensions.get('window').width / 2,

		// borderWidth: 1,
		// borderColor: 'blue',
	},
	card: {
		flex: 1,
		
	},
	image: {
		width: '100%',
		height: '100%',
		//alignSelf: 'center',
		justifyContent: 'center',
		aspectRatio: 1,
		
	},
	firstColumn: {
		paddingLeft: 10
	},
	lastColumn: {
		paddingRight: 10
	}
});

export default AddSerieCard;