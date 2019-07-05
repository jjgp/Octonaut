//
//  UIColor+Hex.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/11/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import UIKit

extension UIColor {

  /// Attribution: https://www.hackingwithswift.com/example-code/uicolor/how-to-convert-a-hex-color-to-a-uicolor.
  /// Creates a UIColor from a hexadecimal string.
  ///
  /// - Parameters:
  ///   - hex: a 6 character hexadecimal string preceded by a single hash character
  ///   - alpha: transparency value between (0, 1)
  public convenience init?(hex: String, alpha: CGFloat = 1) {
    let r, g, b: CGFloat
    let start = hex.index(hex.startIndex, offsetBy: hex.hasPrefix("#") ? 1 : 0)
    let hexColor = String(hex[start...])
    
    let scanner = Scanner(string: hexColor)
    var hexNumber: UInt64 = 0
    guard hexColor.count == 6, scanner.scanHexInt64(&hexNumber) else {
      return nil
    }
    
    r = CGFloat((hexNumber & 0x00ff0000) >> 16) / 255
    g = CGFloat((hexNumber & 0x0000ff00) >> 8) / 255
    b = CGFloat(hexNumber & 0x000000ff) / 255
    
    self.init(red: r, green: g, blue: b, alpha: alpha)
  }
  
}
