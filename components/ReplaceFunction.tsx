import { StackActions } from "@react-navigation/native";
export const nextNavigation = (
  screen: string,
  navigation: { dispatch: Function },
  props?: any
) => {
  navigation.dispatch(StackActions.replace(screen, props));
};

{
  /*  
    if i use the stack navigatior to navigate between 
     1)login
     2)reset password
     3)forgot password 
     4)register

     then the stack need to deal with large no of compoents that may leads to breakage
     now i am using replace() by using which i can navigate threw multiple pages but the stack element is one only
     *********
     since it is used by above four componenets instead of making  code-duplication 
     i am declaring it globally and will import when i ever i needed just by passing props  

*/
}
