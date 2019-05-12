//
//  SearchListCell.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/10/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import UIKit

class SearchListCell: UITableViewCell {
  
  @IBOutlet var titleLabel: UILabel!
  @IBOutlet var summaryLabel: UILabel!
  @IBOutlet var languageStackView: UIStackView!
  @IBOutlet var languageImageView: UIImageView!
  @IBOutlet var languageLabel: UILabel!
  @IBOutlet var starsStackView: UIStackView!
  @IBOutlet var starsImageView: UIImageView!
  @IBOutlet var starsLabel: UILabel!
  @IBOutlet var timeAgoStackView: UIStackView!
  @IBOutlet var timeAgoImageView: UIImageView!
  @IBOutlet var timeAgoLabel: UILabel!
  
  override func awakeFromNib() {
    super.awakeFromNib()
    let grey = UIColor(hex: "#767C84")
    summaryLabel.textColor = grey
    languageImageView.image = languageImageView.image?.withRenderingMode(.alwaysTemplate)
    languageLabel.textColor = grey
    starsImageView.image = starsImageView.image?.withRenderingMode(.alwaysTemplate)
    starsImageView.tintColor = grey
    starsLabel.textColor = grey
    timeAgoImageView.image = timeAgoImageView.image?.withRenderingMode(.alwaysTemplate)
    timeAgoImageView.tintColor = grey
    timeAgoLabel.textColor = grey
  }
  
}

extension SearchListCell {
  
  static let reuseIdentifier = "SearchListCell"
  
  static func nib() -> UINib {
    return UINib(nibName: reuseIdentifier, bundle: nil)
  }
  
}
