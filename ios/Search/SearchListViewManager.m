//
//  SearchListViewManager.m
//  LostKitty
//
//  Created by Jason Prasad on 5/8/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "SearchListViewManager.h"
#import "SearchListView.h"

@implementation SearchListViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  UIView *view = [[SearchListView alloc] init];
  view.backgroundColor = [UIColor redColor];
  return view;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}


@end
