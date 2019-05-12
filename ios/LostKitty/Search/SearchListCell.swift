//
//  SearchListCell.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/10/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import UIKit

struct SearchListCellModel {
  
  let description: String?
  let forkCount: Int?
  let fromNow: String?
  let id: String?
  let language: (name: String, color: String)?
  let nameWithOwner: String?
  let stargazers: Int?
  let topics: [String]?
  
  init(json: JSON) {
    description = json.description?.stringValue
    forkCount = json.forkCount?.intValue
    fromNow = json.fromNow?.stringValue
    id = json.id?.stringValue
    language = json.languages?.nodes?.arrayOfJSON?.first.flatMap { ($0.name?.stringValue, $0.color?.stringValue) as? (String, String) }
    nameWithOwner = json.nameWithOwner?.stringValue
    stargazers = json.stargazers?.totalCount?.intValue
    topics = json.repositoryTopics?.nodes?.arrayOfJSON?.compactMap { $0.topic?.stringValue }
  }
  
}

class SearchListCell: UITableViewCell {
  
  @IBOutlet var languageStackView: UIStackView!
  @IBOutlet var languageImageView: UIImageView!
  @IBOutlet var languageLabel: UILabel!
  var primaryColor: UIColor? {
    didSet {
      titleLabel.textColor = primaryColor
    }
  }
  var secondaryColor = UIColor(hex: "#767C84") {
    didSet {
      setSecondaryColors()
    }
  }
  @IBOutlet var starsStackView: UIStackView!
  @IBOutlet var starsImageView: UIImageView!
  @IBOutlet var starsLabel: UILabel!
  @IBOutlet var summaryLabel: UILabel!
  @IBOutlet var fromNowStackView: UIStackView!
  @IBOutlet var fromNowImageView: UIImageView!
  @IBOutlet var fromNowLabel: UILabel!
  @IBOutlet var titleLabel: UILabel!
  
  override func awakeFromNib() {
    super.awakeFromNib()
    languageImageView.image = languageImageView.image?.withRenderingMode(.alwaysTemplate)
    starsImageView.image = starsImageView.image?.withRenderingMode(.alwaysTemplate)
    fromNowImageView.image = fromNowImageView.image?.withRenderingMode(.alwaysTemplate)
    setSecondaryColors()
  }
  
}

extension SearchListCell {
  
  static let reuseIdentifier = "SearchListCell"
  
  static func nib() -> UINib {
    return UINib(nibName: reuseIdentifier, bundle: nil)
  }
  
}

extension SearchListCell {
  
  func setModel(_ model: SearchListCellModel) {
    titleLabel.text = model.nameWithOwner
    summaryLabel.text = model.description
    if let (name, color) = model.language {
      languageLabel.text = name
      languageImageView.tintColor = UIColor(hex: color)
    } else {
      languageStackView.isHidden = true
    }
    if let stargazers = model.stargazers.map({ String($0) }) {
      starsLabel.text = stargazers
    } else {
      starsStackView.isHidden = true
    }
    if let fromNow = model.fromNow {
      fromNowLabel.text = fromNow
    } else {
      fromNowStackView.isHidden = true
    }
  }
  
  func setSecondaryColors() {
    summaryLabel.textColor = secondaryColor
    languageLabel.textColor = secondaryColor
    starsImageView.tintColor = secondaryColor
    starsLabel.textColor = secondaryColor
    fromNowImageView.tintColor = secondaryColor
    fromNowLabel.textColor = secondaryColor
  }
  
}

extension SearchListCell {
  
  override func prepareForReuse() {
    languageStackView.isHidden = false
    starsStackView.isHidden = false
    fromNowImageView.isHidden = false
  }
  
}
