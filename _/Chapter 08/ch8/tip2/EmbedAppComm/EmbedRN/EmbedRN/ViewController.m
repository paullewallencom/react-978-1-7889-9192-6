//
//  ViewController.m
//  EmbedRN
//
//  Created by Stanislav Bershadskiy on 9/4/16.
//  Copyright © 2016 Stanislav Bershadskiy. All rights reserved.
//

#import "ViewController.h"
#import "RCTRootView.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "EmbedViewController.h"

@interface ViewController () <RCTBridgeDelegate> {
    EmbedViewController *embedViewController;
    RCTBridge *_bridge;
    BOOL isRNRunning;
}

@property (weak, nonatomic) IBOutlet UITextField *userNameField;

@end

@implementation ViewController

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    return jsCodeLocation;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)openRNAppEmbeddedButtonPressed:(id)sender {
    NSString *userName = _userNameField.text;
    NSDictionary *props = @{@"userName" : userName};
    
    if(_bridge == nil) {
        _bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
    }
    
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBridge :_bridge
                      moduleName        : @"EmbedApp"
                      initialProperties : props];
    
    isRNRunning = true;
    [embedViewController setView:rootView];
}

- (IBAction)onUserNameChanged:(id)sender {
    if(isRNRunning == YES && _userNameField.text.length > 3) {
        [_bridge.eventDispatcher sendAppEventWithName:@"UserNameChanged" body:@{@"userName" : _userNameField.text}];
    }
}

- (void) prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if([segue.identifier isEqualToString:@"embed"]) {
        embedViewController = segue.destinationViewController;
    }
}
@end
