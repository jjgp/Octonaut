open BsReactNative;

let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self =>
    <View
      style=Style.(
              style([flex(1.), justifyContent(Center), alignItems(Center)])
            )>
      <Text value="Hello World!" />
    </View>,
};

let default = ReasonReact.wrapReasonForJs(~component, () => make());
