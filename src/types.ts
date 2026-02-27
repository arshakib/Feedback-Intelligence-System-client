export interface IFeedback {
  _id: string;
  userName: string;
  userEmail: string;
  feedbackText: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  team: string;
  createdAt: string;
}