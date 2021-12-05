import React,{useEffect,useRef} from 'react';
import { TouchableOpacity, TextInput} from 'react-native';
import * as Colors from '../constants/ColorDefs';

const SearchBar = (props) => {
  const [searchText, setSearchText] = React.useState(props.value);
  const inputRef = useRef();
  useEffect(() => {
    props.isFoucused && inputRef.current.focus();
  }, [props.isFoucused]);

  return (
    <TouchableOpacity
      onPress={() => {
        inputRef.current.focus();
      }}
      style={{
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 24,
        borderRadius: 4,
        width: '90%',
        paddingHorizontal:10,
        backgroundColor:Colors.WHITE
      }}>
      <TextInput
        ref={inputRef}
        clearButtonMode="always"
        style={{
          width: '100%',
          height: 40,
          fontSize: 14,
        }}
        maxLength={35}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.CLR_8797AA}
        value={searchText}
        underlineColorAndroid= {Colors.TRANS}
        onFocus={() => {
          props.onFocus();
        }}
        onChangeText={(query) => {
          setSearchText(query)
          props.onChangeText(query);
        }}
        onBlur ={()=>{
          props.onBlur && props.onBlur()
        }}
      />
    </TouchableOpacity>
  );
};

export default SearchBar;
