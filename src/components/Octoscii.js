import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../common/colors';

const octocscii = `
       _![\\/:                           _/\\/
       >try%%#*;                   "[#%@do@|
      ;%)(:^>?&@#>>##%%%--%%%,%##>%@{]&&&&&#
      /@&&0xDEADBEEF&&&&&&&&&&&&let&&&&&&&&#
      _%><>&&&&&&&&func&&&&&&&&&&&&??&&&&&&$
     /%&&return.(>&&&&&&&&for&&&&&&&&&&:&&%+
    +@&&&{,&&&&<.>&&&&var&&&&&&&&&guard&&&@#:
   ^@&&&&&const&&&&&&&&|><&&&&&&&&&&&&else&&&>
   #&&...&&&&&&@@@@yield&&&&&&@@++@&|&%&if{}&@~
   %&&*&+=&%>^~_::-;"~/[~\\^/~";:::;/?#%&&&&&&&+
   %&&&&&%+                           ;#@None&+
   %||>)%;                              =|*#&&(
   >NULL#                                %def%;
   |%&&&#                               /@&&&#
   ~?%&&@?                              >&&&#/
     "#@&@>:                           >@&@#;
       \\#%&%#(;                     />%&%#^
">/^_     ;?>#%%%%hello#>>>world##%%#>+~
  ?#%#?;         \\%&&while.->&@%(
    =%##~        #foobar&!!&&&&&% 
    (@%#>}[%|^^#fun%*=&%%&&+@&&&?
      (%&@@#%#@%@&&%+&&&>#&&&[%&&>
        ?##%[]+%%&&#?as&>#&&&^#&&>
                >&&#?&&&>>nil^#in>
                >&&#*&&&>>&&&^#&&>
                #sh#*&&&}>&&&^#-=>
               ^%&@+[&&.*[git?}@&%|
             _#%##//%&@>  #@&%~\\>##>
                  >#="    "]#]
`;

const Octocscii = () => <Text style={styles.text}>{octocscii}</Text>;

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    color: Colors.blue,
    fontFamily: 'Menlo',
    fontSize: 12,
  },
});

export default Octocscii;
