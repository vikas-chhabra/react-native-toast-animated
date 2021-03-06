# react-native-toast-animated
### example basic Usage with hooks


    
    import React, {useRef} from 'react';
	import Toast from 'react-native-toast-animated';

	export default function basicUsage(){
	const toastRef = useRef();
	return(){

		<View>
		...
			<TouchableOpacity onPress={()=>{
				toastRef.current.showToast(
					{
						time: 5000,
						msg: 'This is a success Toast!!',
					},
					()=>{ console.log("toast ended") }
				)
			}}>
				<Text>ShowToast</Text>
			</TouchableOpacity>

			<Toast
				ref={toastRef}
				height={100} //optional
				bottom={false} //optional bool default false
			/>
			...
		</View>
		}
	}



showToast parameters

| Parameter       	   | Type   | Required | Description                                         		| Default |
|----------------------|--------|----------|------------------------------------------------------------|---------|
| msg             	   | string | true     | The message to be displayed in toast.               		| -       |
| time            	   | number | false    | Close delay, after the time toast should be closed. 		| 2000    |
| backgroundColor 	   | string | false    | Color code of the background color.                 		| -       |
| type            	   | enum   | false    | danger or warn or success or info                   		| success |
| friction        	   | number | false    | Friction of the animation of toast.                 		| 1.2     |
| tesnsion        	   | number | false    | Tension for the animation of toast.                 		| 0.8     |
| textColor       	   | string | false    | Color code of the text color.                       		| #fff    |
| paddingTop      	   | number | false    | Padding From top of the toast.                      		| 30      |
| borderRadius    	   | number | false    | For giving round to the corners of toast.           		| 0       |
| borderTopRightRadius | number | false    | For giving round only to the top right corner of toast.    | 20      |
| borderTopLeftRadius  | number | false    | For giving round only to the top left corner of toast.     | 20      |


### example basic Usage with class component

	import Toast from 'react-native-toast-animated';

	export default class basicUsage extends Component{
		render{
			return(){

				<View>
				...
					<TouchableOpacity onPress={()=>{
						this.refs.toastRef.showToast(
							{
								time: 5000,
								msg: 'This is a success Toast!!',
							},
							()=>{ console.log("toast ended") }
						)
					}}>
						<Text>ShowToast</Text>
					</TouchableOpacity>

					<Toast
						ref="toastRef"
						height={100} //optional
						bottom={false} //optional bool default false
					/>
					...
				</View>
				}
		}
	}

<div>
	<img src="./src/sample.gif" width="300"/>
</div>
