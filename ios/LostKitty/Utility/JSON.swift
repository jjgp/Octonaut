//
//  JSON.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/9/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import Foundation

/// Attribution: https://github.com/apple/swift-evolution/blob/master/proposals/0195-dynamic-member-lookup.md
@dynamicMemberLookup
enum JSON {
  
  case int(Int)
  case string(String)
  case array([Any])
  case dictionary([String: Any])
  
  init?(_ value: Any?) {
    switch value {
    case is Int:
      self = .int(value as! Int)
    case is String:
      self = .string(value as! String)
    case is [Any]:
      self = .array(value as! [Any])
    case is [String: Any]:
      self = .dictionary(value as! [String: Any])
    default:
      return nil
    }
  }
  
}

extension JSON {
  
  subscript(index: Int) -> JSON? {
    if case .array(let arr) = self, index < arr.count {
      return JSON(arr[index])
    }
    return nil
  }
  
  subscript(key: String) -> JSON? {
    if case .dictionary(let dict) = self {
      return JSON(dict[key])
    }
    return nil
  }
  
  subscript(dynamicMember member: String) -> JSON? {
    if case .dictionary(let dict) = self {
      return JSON(dict[member])
    }
    return nil
  }
  
}

extension JSON {
  
  var intValue: Int? {
    if case .int(let int) = self {
      return int
    }
    return nil
  }
  
  var stringValue: String? {
    if case .string(let str) = self {
      return str
    }
    return nil
  }
  
  var arrayValue: [Any]? {
    if case .array(let arr) = self {
      return arr
    }
    return nil
  }
  
  var arrayOfJSON: [JSON]? {
    return arrayValue?.compactMap { JSON($0) }
  }
  
  func array<T>(of: T) -> [T]? {
    return arrayValue?.compactMap { JSON($0 as? T) as? T }
  }
  
  var dictionaryValue: [String: Any]? {
    if case .dictionary(let dict) = self {
      return dict
    }
    return nil
  }
  
  var dictionaryOfJSON: [String: JSON]? {
    if let keysWithValues = dictionaryValue?.compactMap({ ($0, JSON($1)) as? (String, JSON) }) {
      return Dictionary(uniqueKeysWithValues: keysWithValues)
    }
    return nil
  }
  
  func dictionary<T>(of: T) -> [String: T]? {
    if let keysWithValues = dictionaryValue?.compactMap({ ($0, $1) as? (String, T) }) {
      return Dictionary(uniqueKeysWithValues: keysWithValues)
    }
    return nil
  }
  
}
