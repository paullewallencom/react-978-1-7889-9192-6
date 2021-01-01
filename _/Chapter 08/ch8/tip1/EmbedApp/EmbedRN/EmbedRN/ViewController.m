//
//  ViewController.m
//  EmbedRN
//
//  Created by Stanislav Bershadskiy on 9/4/16.
//  Copyright © 2016 Stanislav Bershadskiy. All rights reserved.
//

#import "ViewController.h"
#import "RCTRootView.h"
#import "EmbedViewController.h"

@interface ViewController () {
    EmbedViewController *embedViewController;
}

@end

@implementation ViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)openRNAppButtonPressed:(id)sender {
    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"EmbedApp"
                         initialProperties : nil
                          launchOptions    : nil];
    
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
    [self presentViewController:vc animated:YES completion:nil];
}
- (IBAction)openRNAppEmbeddedButtonPressed:(id)sender {
    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"EmbedApp"
                         initialProperties : nil
                          launchOptions    : nil];
    
    [embedViewController setView:rootView];
}


- (void) prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if([segue.identifier isEqualToString:@"embed"]) {
        embedViewController = segue.destinationViewController;
    }
}
@end
