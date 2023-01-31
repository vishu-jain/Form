import { View, Text, StyleSheet, Button, TextInput, Alert, Image, StatusBar,LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommonButton from '../components/commonButton'
import CommonTextInput from '../components/commonTextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioButtonRN from 'radio-buttons-react-native'
import { Dropdown } from 'react-native-element-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-crop-picker';
import Slider from '@react-native-community/slider';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { Icon } from '../components'
import Icons from 'react-native-vector-icons/Ionicons';
import Iconentypo from 'react-native-vector-icons/Entypo';
import CheckBox from 'react-native-check-box'
import MultiSelect from 'react-native-multiple-select'
import { emailValidation, passwordValidation, phoneValidation, letterValidation } from '../utils/validation'

export default function My_info() {

  const [radio, setRadio] = useState([
    {
      label: 'Male',
    },
    {
      label: 'Female',
    },
  ]);

  const statedata = [
    { label: 'Uttarpradesh', value: 'Uttarpradesh' },
    { label: 'Haryana', value: 'Haryana' },
    { label: 'Uttarakhand', value: 'Uttarakhand' },
    { label: 'Jharkhand', value: 'Jharkhand' },
    { label: 'Manipur', value: 'Manipur' },
    { label: 'Sikkim', value: 'Sikkim' },
    { label: 'Goa', value: 'Goa' },
    { label: 'Gujarat', value: 'Gujarat' },
  ];

  const [selectedlang, setSelectedlang] = useState([])
  const languages = [{
    id: '1',
    name: 'Java'
  }, {
    id: '2',
    name: 'C'
  }, {
    id: '3',
    name: 'C++'
  }, {
    id: '4',
    name: 'React js'
  }, {
    id: '5',
    name: 'Node js'
  }, {
    id: '6',
    name: 'Flutter'
  }, {
    id: '7',
    name: 'React Native'
  }, {
    id: '8',
    name: 'Python'
  }, {
    id: '9',
    name: 'PHP'
  }, {
    id: '10',
    name: 'C#'
  }
  ];


  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const [formInput, setFormInput] = useState(
    {
      profile: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      emergencycontact: '',
      gender: '',
      address: '',
      pincode: '',
      state: '',
      city: '',
      dob: '',
      sports: [
        {
          name: '', isadded: false
        },
      ],
      education: [
        {
          name: '', isadded: false
        }
      ],
      hobbies: {
        Dancing: false,
        Singing: false,
        Swimming: false,
        Coding: false,
        Travelling: false,
        Cricket: false,
        Badminton: false,
      },
      techlanguages: [],
      debitcardno: '',
      cvv: '',
      expirymm: '',
      expiryyy: '',
      rating: 0,
    }
  )
  const [showdata, setShowdata] = useState(false)
  const [seePassword, setSeePassword] = useState(true);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
    setFormInput(Object.assign({}, formInput, { dob: selectedDate.toLocaleDateString() }))
  };
  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (show == true) {
      setShow(false);
    } else {
      setShow(true);
    }
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };

  const addRow = (index) => {
    let temparray = formInput.sports
    temparray[index].isadded = true
    temparray.push({ name: '', isadded: false })
    setFormInput(Object.assign({}, formInput, { sports: temparray }));
  }

  const Removeitem = (index) => {
    let temparray = formInput.sports
    temparray = temparray.filter((varia, i) => i !== index)
    setFormInput(Object.assign({}, formInput, { sports: temparray }))
  }

  const addRowedu = (index) => {
    let temparray = formInput.education
    temparray[index].isadded = true
    temparray.push({ name: '', isadded: false })
    setFormInput(Object.assign({}, formInput, { education: temparray }));
  }

  const Removeitemedu = (index) => {
    let temparray = formInput.education
    temparray = temparray.filter((varia, i) => i !== index)
    setFormInput(Object.assign({}, formInput, { education: temparray }))
  }

  const onSelectedItemsChange = selectedItems => {
    setSelectedlang(selectedItems);
    setFormInput(Object.assign({}, formInput, { techlanguages: selectedItems }))
  };

  const submitdata = () => {
    if (formInput.firstname === '' || formInput.lastname === '' || formInput.email === '' || formInput.password === '' || formInput.city === '' ||
      formInput.phone === '' || formInput.emergencycontact === '' || formInput.gender === '' ||
      formInput.address === '' || formInput.pincode === '' || formInput.state === '' ||
      formInput.dob === '' || formInput.techlanguages.length <= 0) {
      Alert.alert('Please enter required empty feild')
    } else if (letterValidation(formInput.firstname)) {
      Alert.alert('Please enter valid first name')
    } else if (letterValidation(formInput.lastname)) {
      Alert.alert('Please enter valid last name')
    } else if (!emailValidation(formInput.email)) {
      Alert.alert('Please enter valid email')
    } else if (!passwordValidation(formInput.password)) {
      Alert.alert('Please enter valid password')
    } else if (!phoneValidation(formInput.phone)) {
      Alert.alert('Please enter valid phone no')
    } else if (!phoneValidation(formInput.emergencycontact)) {
      Alert.alert('Please enter valid contact no')
    } else if (formInput.pincode.length < 6) {
      Alert.alert('Please enter valid pincode')
    } else if (formInput.debitcardno.length < 16) {
      Alert.alert('Please enter valid debit card no')
    } else if (formInput.cvv.length < 3) {
      Alert.alert('Please enter valid cvv')
    } else if (formInput.expirymm.length < 2) {
      Alert.alert('Please enter valid expiry month')
    } else if (formInput.expiryyy.length < 2) {
      Alert.alert('Please enter valid expiry year')
    } else {
      setShowdata(!showdata);
    }
  }

  const threeButtonAlert = () => {
    Alert.alert(
      "Upload Image",
      "using",
      [
        {
          text: "Open Camera",
          onPress: () => checkCameraPermission()
        },
        {
          text: "Open Gallery",
          onPress: () => checkGalleryPermission()
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  }

  function checkCameraPermission() {
    check((Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA))
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request((Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA))
              .then((result) => {
                switch (result) {
                  case RESULTS.GRANTED:
                    openCamera()
                    break;
                  case RESULTS.DENIED:
                    break;
                }
              })
            break;
          case RESULTS.GRANTED:
            console.log('granted')
            openCamera()
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const checkGalleryPermission = () => {
    check((Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE))
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request((Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE))
              .then((result) => {
                switch (result) {
                  case RESULTS.GRANTED:
                    openGallery();
                    break;
                }
              })
            break;
          case RESULTS.GRANTED:
            openGallery();
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true
    }).then(res => {
      let source = { uri: res.path }
      setFormInput(Object.assign({}, formInput, { profile: source }))
    });
  }

  const openGallery = () => {
    ImagePicker.openPicker({
      cropping: true
    }).then(res => {
      let source = { uri: res.path }
      setFormInput(Object.assign({}, formInput, { profile: source }))
    });
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  return (
    <KeyboardAwareScrollView>
      <View>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <View style={styles.profileiconStyle}>
          <TouchableOpacity onPress={() => threeButtonAlert()}>
            {formInput.profile ? (
              <View>
                <Image source={formInput.profile} style={{ height: 100, width: 100, borderRadius: 50, position: 'absolute' }} />
                <Iconentypo name='edit' size={30} style={{ marginTop: 70, marginStart: 60 }} />
              </View>
            ) : (
              <Icons name="person-add-outline" size={40} color={'grey'} style={{ alignSelf: 'center' }} />
            )}
          </TouchableOpacity>
        </View>
        <CommonTextInput
          label='First name*'
          value={formInput.firstname}
          placeholder='Enter name'
          onChangeText={text => setFormInput(Object.assign({}, formInput, { firstname: text })
          )}
        />
        <CommonTextInput
          label='Last name*'
          value={formInput.lastname}
          placeholder='Enter name'
          onChangeText={text => setFormInput(Object.assign({}, formInput, { lastname: text })
          )}
        />
        <CommonTextInput
          label='Email*'
          value={formInput.email}
          placeholder='Enter email'
          onChangeText={text => setFormInput(Object.assign({}, formInput, { email: text })
          )} />
        <Text style={styles.Label}>Password*</Text>
        <View style={styles.passwordView}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Enter password"
            label="Password*"
            value={formInput.password}
            onChangeText={text => setFormInput(Object.assign({}, formInput, { password: text })
            )}
            secureTextEntry={seePassword}
            autoCaps={false}
          />
          <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
            <Icons
              name={seePassword ? 'eye-off' : 'eye'}
              size={25}
              color='grey'
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>
        <CommonTextInput
          label='Phone no*'
          placeholder='Enter phone no'
          value={formInput.phone}
          keyboardType='numeric'
          maxLength={10}
          onChangeText={text => setFormInput(Object.assign({}, formInput, { phone: text })
          )} />
        <CommonTextInput
          label='Emergency contact no*'
          placeholder='Enter emergency contact no'
          maxLength={10}
          value={formInput.emergencycontact}
          keyboardType='numeric'
          onChangeText={text => setFormInput(Object.assign({}, formInput, { emergencycontact: text })
          )} />
        <Text style={styles.Label}> Gender* </Text>
        <RadioButtonRN
          data={radio}
          selectedBtn={e => setFormInput(Object.assign({}, formInput, { gender: e.value })
          )}
          box={false}
          style={{ flexDirection: 'row', marginLeft: 20 }}
          textStyle={{ fontSize: 20, marginLeft: 10 }}
          boxStyle={{ width: 180 }}
          deactiveColor="black"
        />
        <Text style={styles.Label}> Hobbies </Text>
        <CheckBox isChecked={formInput.hobbies.Dancing} rightText="Dancing" style={{ marginLeft: 20 }} rightTextStyle={{ fontSize: 20, color: formInput.hobbies.Dancing ? 'blue' : 'black' }}
          onClick={() => {
            let temp = formInput.hobbies
            temp.Dancing = !temp.Dancing
            setFormInput(Object.assign({}, formInput, { hobbies: temp }))
          }
          }
          checkedCheckBoxColor='blue'
        />
        <CheckBox isChecked={formInput.hobbies.Singing} rightText="Singing" style={{ marginLeft: 20 }} rightTextStyle={{ fontSize: 20, color: formInput.hobbies.Singing ? 'blue' : 'black' }}
          onClick={() => {
            let temp = formInput.hobbies
            temp.Singing = !temp.Singing
            setFormInput(Object.assign({}, formInput, { hobbies: temp }))
          }
          }
          checkedCheckBoxColor='blue'
        />
        <CheckBox isChecked={formInput.hobbies.Swimming} rightText="Swimming" style={{ marginLeft: 20 }} rightTextStyle={{ fontSize: 20, color: formInput.hobbies.Swimming ? 'blue' : 'black' }}
          onClick={() => {
            let temp = formInput.hobbies
            temp.Swimming = !temp.Swimming
            setFormInput(Object.assign({}, formInput, { hobbies: temp }))
          }
          }
          checkedCheckBoxColor='blue'
        />
        <CheckBox isChecked={formInput.hobbies.Coding} rightText="Coding" style={{ marginLeft: 20 }} rightTextStyle={{ fontSize: 20, color: formInput.hobbies.Coding ? 'blue' : 'black' }}
          onClick={() => {
            let temp = formInput.hobbies
            temp.Coding = !temp.Coding
            setFormInput(Object.assign({}, formInput, { hobbies: temp }))
          }
          }
          checkedCheckBoxColor='blue'
        />
        <CheckBox isChecked={formInput.hobbies.Travelling} rightText="Travelling" style={{ marginLeft: 20 }} rightTextStyle={{ fontSize: 20, color: formInput.hobbies.Travelling ? 'blue' : 'black' }}
          onClick={() => {
            let temp = formInput.hobbies
            temp.Travelling = !temp.Travelling
            setFormInput(Object.assign({}, formInput, { hobbies: temp }))
          }
          }
          checkedCheckBoxColor='blue'
        />
        <CheckBox isChecked={formInput.hobbies.Cricket} rightText="Cricket" style={{ marginLeft: 20 }} rightTextStyle={{ fontSize: 20, color: formInput.hobbies.Cricket ? 'blue' : 'black' }}
          onClick={() => {
            let temp = formInput.hobbies
            temp.Cricket = !temp.Cricket
            setFormInput(Object.assign({}, formInput, { hobbies: temp }))
          }
          }
          checkedCheckBoxColor='blue'
        />
        <CheckBox isChecked={formInput.hobbies.Badminton} rightText="Badminton" style={{ marginLeft: 20 }} rightTextStyle={{ fontSize: 20, color: formInput.hobbies.Badminton ? 'blue' : 'black' }}
          onClick={() => {
            let temp = formInput.hobbies
            temp.Badminton = !temp.Badminton
            setFormInput(Object.assign({}, formInput, { hobbies: temp }))
          }
          }
          checkedCheckBoxColor='blue'
        />

        <CommonTextInput
          label='Address*'
          placeholder='Enter address'
          value={formInput.address}
          onChangeText={text => setFormInput(Object.assign({}, formInput, { address: text })
          )}
        />
        <CommonTextInput
          label='Pincode*'
          placeholder='Enter pincode'
          maxLength={6}
          keyboardType='numeric'
          value={formInput.pincode}
          onChangeText={text => setFormInput(Object.assign({}, formInput, { pincode: text })
          )}
        />
        <Text style={styles.Label}> State* </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={statedata}
          search
          maxHeight={300}
          labelField="label"
          placeholder="Select State"
          searchPlaceholder="Search..."
          valueField="value"
          value={formInput.state}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={dropdownitem => {
            setFormInput(Object.assign({}, formInput, { state: dropdownitem.value }))
            setIsFocus(false);
          }}
        />
        <CommonTextInput
          label='City*'
          placeholder='Enter city'
          value={formInput.city}
          onChangeText={text => setFormInput(Object.assign({}, formInput, { city: text })
          )}
        />
        <Text style={styles.Label}> Date of birth</Text>
        <TouchableOpacity
          style={styles.calendarView}
          onPress={showDatepicker}>
          <View style={styles.calendarInput}>
            <Text style={styles.textStyle}>{date.toLocaleDateString()}</Text>
            <Icon name="calendar-602x" family="NowExtra" size={16} color={'black'} />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              maximumDate={new Date()}
              dateFormat={'day month year'}
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.Label}> Sports</Text>
        <View>
          <FlatList
            data={formInput.sports}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flexDirection: 'row', flex: 1, marginBottom: 15 }}>
                  <TextInput
                    value={item.name}
                    placeholder='Enter sports'
                    style={styles.inputstyle}
                    onChangeText={text => {
                      let customtemp = formInput.sports
                      customtemp[index].name = text
                      setFormInput(Object.assign({}, formInput, { sports: customtemp }),
                      )
                    }}
                  />
                  {
                    item.isadded && item.name !== '' ? (
                      <TouchableOpacity style={styles.button} onPress={() => Removeitem(index)}>
                        <Text style={{ color: 'white' }}> Remove</Text>
                      </TouchableOpacity>
                    ) :
                      (
                        <TouchableOpacity style={styles.button} onPress={() => addRow(index)}>
                          <Text style={{ color: 'white' }}> Add More</Text>
                        </TouchableOpacity>
                      )
                  }
                </View>
              )
            }}
          />
        </View>

        <Text style={styles.Label}> Education </Text>
        <View>
          <FlatList
            data={formInput.education}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flexDirection: 'row', flex: 1, marginBottom: 15 }}>
                  <TextInput
                    value={item.name}
                    placeholder='Enter education'
                    style={styles.inputstyle}
                    onChangeText={text => {
                      let customtemp = formInput.education
                      customtemp[index].name = text
                      setFormInput(Object.assign({}, formInput, { education: customtemp }),
                      )
                    }}
                  />
                  {
                    item.isadded && item.name !== '' ? (
                      <TouchableOpacity style={styles.button} onPress={() => Removeitemedu(index)}>
                        <Text style={{ color: 'white' }}> Remove</Text>
                      </TouchableOpacity>
                    ) :
                      (
                        <TouchableOpacity style={styles.button} onPress={() => addRowedu(index)}>
                          <Text style={{ color: 'white' }}> Add More</Text>
                        </TouchableOpacity>
                      )
                  }
                </View>
              )
            }}
          />
        </View>

        <Text style={styles.Label}> Languages* </Text>
        <MultiSelect
          items={languages}
          uniqueKey="name"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedlang}
          selectText="Select languages"
          searchInputPlaceholderText="Search Items..."
          submitButtonColor="green"
          submitButtonText="Submit"
          styleDropdownMenu={styles.dropdown}
          styleTextDropdown={{ fontSize: 15 }}
          styleSelectorContainer={{ marginHorizontal: 20 }}
          searchInputStyle={{ height: 40 }}
          styleItemsContainer={{ marginHorizontal: 20 }}
          tagContainerStyle={{ marginHorizontal: 20 }}
          tagRemoveIconColor="black"
          tagBorderColor="#CCC"
          tagTextColor="black"

        />
        <CommonTextInput
          label='Debit card no.*'
          placeholder='Enter debit card no'
          keyboardType='numeric'
          maxLength={16}
          value={formInput.debitcardno}
          onChangeText={text => setFormInput(Object.assign({}, formInput, { debitcardno: text })
          )}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CommonTextInput
            label='cvv*'
            placeholder='Enter cvv'
            keyboardType='numeric'
            value={formInput.cvv}
            textInputStyle={{ width: 80 }}
            maxLength={3}
            onChangeText={text => setFormInput(Object.assign({}, formInput, { cvv: text })
            )}
          />
          <View style={{ flexDirection: 'row' }}>
            <CommonTextInput
              label='expiry*'
              value={formInput.expirymm}
              viewstyle={{ marginHorizontal: 0 }}
              textInputStyle={{ width: 50 }}
              placeholder='MM'
              keyboardType='numeric'
              maxLength={2}
              onChangeText={text => setFormInput(Object.assign({}, formInput, { expirymm: text })
              )}
            />
            <CommonTextInput
              viewstyle={{ marginRight: 20, marginLeft: 5 }}
              placeholder='YY'
              value={formInput.expiryyy}
              keyboardType='numeric'
              textInputStyle={{ width: 40 }}
              maxLength={2}
              onChangeText={text => setFormInput(Object.assign({}, formInput, { expiryyy: text })
              )}
            />
          </View>
        </View>
        <Text style={styles.Label}> Slider </Text>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1da39d' }}>{formInput.rating}</Text>
        </View>
        <Slider
          style={{ height: 40, marginHorizontal: 20 }}
          minimumValue={0}
          maximumValue={10}
          step={1}
          minimumTrackTintColor='blue'
          maximumTrackTintColor="#000000"
          onValueChange={text => setFormInput(Object.assign({}, formInput, { rating: text }))}
        />
        <CommonButton title='Submit' onPress={() => submitdata()} />
        {showdata &&
          <Text>{JSON.stringify(formInput)}</Text>
        }
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create(
  {
    Label: {
      color: 'grey',
      fontSize: 20,
      fontWeight: '400',
      fontStyle: 'normal',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 15
    },
    inputstyle: {
      borderWidth: 1,
      borderColor: 'black',
      height: 40,
      borderRadius: 8,
      paddingLeft: 8,
      fontSize: 16,
      marginLeft: 20,
      width: 220
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 8,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
      width: 80
    },
    dropdown: {
      borderColor: 'black',
      borderRadius: 8,
      borderWidth: 1,
      marginHorizontal: 20,
      height: 50,
      paddingHorizontal: 8,
      backgroundColor: 'white'
    },
    placeholderStyle: {
      fontSize: 16,
    },
    calendarView: {
      borderWidth: 1,
      borderColor: 'black',
      height: 40,
      borderRadius: 8,
      paddingLeft: 8,
      paddingRight: 8,
      marginHorizontal: 20
      // flex:1,
    },
    calendarInput: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    textStyle: {
      fontSize: 16,
    },
    profileiconStyle: {
      borderRadius: 50,
      height: 100,
      width: 100,
      backgroundColor: 'white',
      justifyContent: 'center',
      marginTop: 20,
      marginLeft: 20
    },
    passwordView: {
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      height: 40,
      alignItems: 'center',
    },
    inputPassword: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 8,
    },
    passwordIcon: {
      paddingRight: 10,
    },
  }
)