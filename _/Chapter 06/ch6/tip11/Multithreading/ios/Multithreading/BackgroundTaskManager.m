//
//  BackgroundTaskManager.m
//  Multithreading
//
//  Created by Stanislav Bershadskiy on 7/28/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "BackgroundTaskManager.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation BackgroundTaskManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loadInBackground) {
  backgroundQueue = dispatch_queue_create("com.moduscreate.bgqueue", NULL);
  
  dispatch_async(backgroundQueue, ^{
    NSLog(@"processing background");
    [self.bridge.eventDispatcher sendAppEventWithName:@"backgroundProgress" body:@{@"status": @"Loading"}];
    [NSThread sleepForTimeInterval:5];
    NSLog(@"slept");
    dispatch_async(dispatch_get_main_queue(), ^{
      NSLog(@"Done processing; main thread");
      [self.bridge.eventDispatcher sendAppEventWithName:@"backgroundProgress" body:@{@"status": @"Done"}];
    });
  });
}

@end
