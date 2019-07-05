//
//  RepositoryListManager.m
//  LostKitty
//
//  Created by Jason Prasad on 5/8/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RepositoryListManager, RCTViewManager)

RCT_EXTERN_METHOD(endRefreshing:(nonnull NSNumber *)reactTag)
RCT_EXPORT_VIEW_PROPERTY(hasMore, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onDidSelect, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onEndReached, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRefresh, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(primaryColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(repositories, NSArray)
RCT_EXPORT_VIEW_PROPERTY(secondaryColor, NSString)

@end
