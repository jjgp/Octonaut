//
//  SearchListManager.m
//  LostKitty
//
//  Created by Jason Prasad on 5/8/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "SearchListManager.h"
#import "SearchList.h"

@implementation SearchListManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[SearchList alloc] init];
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_CUSTOM_VIEW_PROPERTY(results, NSDictonary *, SearchList) {
  NSLog(@"%@", json);
}


@end
